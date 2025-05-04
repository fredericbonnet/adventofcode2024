package main

import (
	"adventofcode2024/adventofcode2024"
	"helena/cli"
)

func main() {
	cli.StaticLoad("adventofcode2024/adventofcode2024", adventofcode2024.InitModule)
	cli.Cli()
}
