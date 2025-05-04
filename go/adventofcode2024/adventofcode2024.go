package adventofcode2024

import (
	"helena/core"
	"helena/helena_dialect"
	"math"
	"strings"
)

/**
 * Main static module entry point.
 */
func InitModule() *helena_dialect.Module {
	scope := helena_dialect.NewRootScope(nil)
	exports := &helena_dialect.Exports{}
	module := helena_dialect.NewModule(scope, exports)
	exportCommand(module, "splitString", splitStringCmd{})
	exportCommand(module, "pow2", pow2Cmd{})
	exportCommand(module, "floor", floorCmd{})
	exportCommand(module, "xor", xorCmd{})
	exportCommand(module, "mod", modCmd{})
	exportCommand(module, "variables", variablesCmd{})
	return module
}

func exportCommand(module *helena_dialect.Module, name string, cmd core.Command) {
	module.Scope.RegisterNamedCommand(name, cmd)
	(*module.Exports)[name] = core.STR(name)
}

type splitStringCmd struct{}

func (splitStringCmd) Execute(args []core.Value, _ any) core.Result {
	_, s := core.ValueToString(args[1])
	_, sep := core.ValueToString(args[2])
	chunks := strings.Split(s, sep)
	values := make([]core.Value, len(chunks))
	for i, chunk := range chunks {
		values[i] = core.STR(chunk)
	}
	return core.OK(core.LIST(values))
}

type pow2Cmd struct{}

func (pow2Cmd) Execute(args []core.Value, _ any) core.Result {
	_, i := core.ValueToInteger(args[1])
	return core.OK(core.INT(1 << i))
}

type floorCmd struct{}

func (floorCmd) Execute(args []core.Value, _ any) core.Result {
	_, f := core.ValueToFloat(args[1])
	return core.OK(core.REAL(math.Floor(f)))
}

type xorCmd struct{}

func (xorCmd) Execute(args []core.Value, _ any) core.Result {
	_, i1 := core.ValueToInteger(args[1])
	_, i2 := core.ValueToInteger(args[2])
	return core.OK(core.INT(i1 ^ i2))
}

type modCmd struct{}

func (modCmd) Execute(args []core.Value, _ any) core.Result {
	_, i1 := core.ValueToInteger(args[1])
	_, i2 := core.ValueToInteger(args[2])
	return core.OK(core.INT(i1 % i2))
}

type variablesCmd struct{}

func (variablesCmd) Execute(_ []core.Value, context any) core.Result {
	scope := context.(*helena_dialect.Scope)
	return core.OK(core.DICT(scope.Context.Variables))
}
