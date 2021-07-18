with import <nixpkgs> {};

stdenv.mkDerivation {
  name = "tjmaynes.com";
  buildInputs = [
    ruby
    jekyll
  ];
}
