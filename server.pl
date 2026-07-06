#!/usr/bin/perl
use strict;
use warnings;
use IO::Socket::INET;
use File::Basename qw(dirname);
use POSIX ();

my $port = $ARGV[0] || 3000;
my $root = dirname(__FILE__);

my $server = IO::Socket::INET->new(
    LocalPort => $port,
    Type      => SOCK_STREAM,
    Reuse     => 1,
    Listen    => 10,
) or die "Cannot bind to port $port: $!\n";

print "CredZo server: http://localhost:$port\n";
$| = 1;

my %mime = (
    html => 'text/html; charset=utf-8',
    htm  => 'text/html; charset=utf-8',
    css  => 'text/css',
    js   => 'application/javascript',
    mjs  => 'application/javascript',
    png  => 'image/png',
    jpg  => 'image/jpeg',
    jpeg => 'image/jpeg',
    svg  => 'image/svg+xml',
    ico  => 'image/x-icon',
    json => 'application/json',
    txt  => 'text/plain',
);

while (my $client = $server->accept()) {
    $client->autoflush(1);

    # Read request line
    my $req = '';
    while (my $line = <$client>) {
        $line =~ s/\r\n$/\n/;
        last if $line eq "\n";
        $req .= $line;
    }

    # Parse request
    my ($method, $path) = $req =~ /^(\w+)\s+(\S+)/;
    $path //= '/';

    # Route / -> prototype HTML
    $path = '/credzo-prototype.html' if $path eq '/';

    # Strip query string
    $path =~ s/\?.*$//;

    # Build file path (handle both / and \ separators)
    my $file = $root . $path;
    $file =~ s|/|\\|g;

    my ($status, $ct, $body);

    if (-f $file) {
        open(my $fh, '<:raw', $file) or do {
            $status = '403 Forbidden';
            $ct     = 'text/plain';
            $body   = 'Forbidden';
            goto RESPOND;
        };
        local $/;
        $body = <$fh>;
        close $fh;

        my ($ext) = $file =~ /\.(\w+)$/;
        $ct     = $mime{ lc($ext // '') } // 'application/octet-stream';
        $status = '200 OK';
    } else {
        $status = '404 Not Found';
        $ct     = 'text/plain';
        $body   = "Not found: $path";
    }

    RESPOND:
    my $len = length($body);
    print $client "HTTP/1.1 $status\r\n";
    print $client "Content-Type: $ct\r\n";
    print $client "Content-Length: $len\r\n";
    print $client "Connection: close\r\n";
    print $client "Cache-Control: no-cache\r\n";
    print $client "\r\n";

    # Send body in chunks to avoid socket buffer overflows
    my $chunk = 65536;
    for (my $i = 0; $i < $len; $i += $chunk) {
        print $client substr($body, $i, $chunk);
    }

    close $client;
}
