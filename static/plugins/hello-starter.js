/* @plugin {"id":"hello-plugin","name":"Hello plugin","version":"1.0.0","permissions":["commands"]} */
mentos.commands.add('hello', 'Say hello', (args) => {
  return args.trim() ? 'Hello, ' + args.trim() + '!' : 'Hello from Mentos!';
});
