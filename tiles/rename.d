import std.file, std.stdio, std.array, std.regex, std.conv, std.string, std.path;

void main()
{
    auto files = ".".dirEntries("*.jpeg", SpanMode.depth).array();
    foreach (entry; files)
    {
        auto filename = entry.to!string();

        auto regex = ctRegex!`.*?-([0-9]+?)-([0-9]+?).jpeg`;
        auto matches = filename.matchAll(regex);

        auto y = 15 - matches.front[1].to!int;
        auto x = matches.front[2].to!int;

        filename.rename(`%s\%s_%s.jpeg`.format(filename.dirName(), y, x));
    }
}