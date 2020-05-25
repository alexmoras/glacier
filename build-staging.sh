eval "$(ssh-agent -s)" && ssh-add $TRAVIS_BUILD_DIR/ssh-key && ssh -i $TRAVIS_BUILD_DIR/ssh-key vectre@sucs.org 'ssh glacier@137.44.10.96 "./build-staging"'
