eval "$(ssh-agent -s)" && ssh-add ./ssh-key && ssh -i ./ssh-key vectre@sucs.org 'ssh glacier@137.44.10.96 "./build-staging"'
