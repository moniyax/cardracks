server "104.154.216.134", user: "deploy", roles: %w{app db web}

set :ssh_options, {
    forward_agent: true,
}
