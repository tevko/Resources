workflow "New workflow" {
  on = "push"
  resolves = ["Setup Node.js for use with actions"]
}

action "Setup Node.js for use with actions" {
  uses = "actions/setup-node@e565252a9dec30354d1b3507ab733e40b9580cc9"
  runs = "node delete-dead-links.js"
}
