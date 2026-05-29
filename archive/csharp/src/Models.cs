class MutablePerson
{
    public string Name { get; set; } = "";
    public int Age { get; set; }
}

record ImmutablePerson(string Name, int Age);
