+++
title = "Replacing my Bash scripts with Nix"
description = "In this blog post, I discuss why and how I moved my custom bash scripts for building consistent developer workstations to nix via nix-darwin"
date = "2021-07-18 13:45:24"
draft = true

[extra]
author = "tjmaynes"
+++
For roughly six years now, I built, maintained and used a suite of homegrown Bash scripts for provisioning developer machines. My goal for these scripts were to make it easy (literally one `make` command) to download and install all of my developer workstation dependencies.