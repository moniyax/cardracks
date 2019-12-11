server "api.cardracks.xyz", user: "deplo", roles: %w{app db web}

set :ssh_options, {
    forward_agent: true,
}
