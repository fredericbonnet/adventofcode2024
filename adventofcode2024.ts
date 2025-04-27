/**
 * Advent Of Code 2024 utilities
 *
 * To use with the CLI, first load the module then import what you need:
 *
 * ```lna
 * load adventofcode2024/adventofcode2024 adventofcode2024
 * import adventofcode2024 (xor)
 * ```
 */
import { Command } from "../helena/src/core/commands";
import { OK } from "../helena/src/core/results";
import {
  IntegerValue,
  LIST,
  ListValue,
  STR,
  INT,
  DICT,
  StringValue,
  RealValue,
  Value,
} from "../helena/src/core/values";
import { Scope } from "../helena/src/helena-dialect/core";
import { Module } from "../helena/src/helena-dialect/modules";

/**
 * Main dynamic module entry point.
 */
export function initModule(): Module {
  const scope = Scope.newRootScope();
  const exports = new Map();
  const module = new Module(scope, exports);
  exportCommand(module, "sortStrings", sortStringsCmd);
  exportCommand(module, "sortInts", sortIntsCmd);
  exportCommand(module, "sortReals", sortRealsCmd);
  exportCommand(module, "splitString", splitStringCmd);
  exportCommand(module, "pow2", pow2Cmd);
  exportCommand(module, "floor", floorCmd);
  exportCommand(module, "round", roundCmd);
  exportCommand(module, "xor", xorCmd);
  exportCommand(module, "mod", modCmd);
  exportCommand(module, "variables", variablesCmd);
  return module;
}

function exportCommand(module: Module, name, cmd) {
  module.scope.registerNamedCommand(name, cmd);
  module.exports.set(name, STR(name));
}

const sortStringsCmd: Command = {
  execute: (args: Value[]) => {
    return OK(
      LIST(
        ListValue.toValues(args[1])[1].sort((a, b) => {
          const sa = StringValue.toString(a)[1];
          const sb = StringValue.toString(b)[1];
          return sa < sb ? -1 : sa > sb ? 1 : 0;
        })
      )
    );
  },
};
const sortIntsCmd: Command = {
  execute: (args: Value[]) => {
    return OK(
      LIST(
        ListValue.toValues(args[1])[1].sort(
          (a, b) => IntegerValue.toInteger(a)[1] - IntegerValue.toInteger(b)[1]
        )
      )
    );
  },
};
const sortRealsCmd: Command = {
  execute: (args: Value[]) => {
    return OK(
      LIST(
        ListValue.toValues(args[1])[1].sort(
          (a, b) => RealValue.toNumber(a)[1] - RealValue.toNumber(b)[1]
        )
      )
    );
  },
};
const splitStringCmd: Command = {
  execute: (args: Value[]) => {
    return OK(
      LIST(
        StringValue.toString(args[1])[1]
          .split(StringValue.toString(args[2])[1])
          .map(STR)
      )
    );
  },
};
const pow2Cmd: Command = {
  execute: (args: Value[]) => {
    return OK(INT(Math.pow(2, IntegerValue.toInteger(args[1])[1])));
  },
};
const floorCmd: Command = {
  execute: (args: Value[]) => {
    return OK(INT(Math.floor(RealValue.toNumber(args[1])[1])));
  },
};
const roundCmd: Command = {
  execute: (args: Value[]) => {
    return OK(INT(Math.round(RealValue.toNumber(args[1])[1])));
  },
};
const xorCmd: Command = {
  execute: (args: Value[]) => {
    return OK(
      INT(
        Number(
          BigInt(IntegerValue.toInteger(args[1])[1]) ^
            BigInt(IntegerValue.toInteger(args[2])[1])
        )
      )
    );
  },
};
const modCmd: Command = {
  execute: (args: Value[]) => {
    return OK(
      INT(
        IntegerValue.toInteger(args[1])[1] % IntegerValue.toInteger(args[2])[1]
      )
    );
  },
};
const variablesCmd: Command = {
  execute: (args: Value[], scope: Scope) => {
    scope.context.variables;
    return OK(DICT(scope.context.variables));
  },
};
