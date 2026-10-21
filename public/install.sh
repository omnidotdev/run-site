#!/bin/sh
# run installer: self-host anything on your own machine with one command.
#
#   curl -fsSL https://run.omni.dev/install.sh | sh
#
# Downloads a prebuilt `run` binary for your platform from GitHub Releases. If no
# prebuilt binary exists for your OS/arch (or the download fails), falls back to
# building from source with cargo.
# Overridable: RUN_VERSION=<tag> RUN_INSTALL_DIR=<dir> sh install.sh
set -eu

REPO="omnidotdev/run-cli"
BINARY="run"
VERSION="${RUN_VERSION:-latest}"

info() { printf '  %s\n' "$1"; }
err() { printf 'error: %s\n' "$1" >&2; exit 1; }

os="$(uname -s)"
arch="$(uname -m)"

# --- fallback: build from source with cargo --------------------------------
cargo_fallback() {
  if command -v cargo >/dev/null 2>&1; then
    info "No prebuilt binary for ${arch}-${os}; building from source with cargo..."
    cargo install --git "https://github.com/${REPO}" "${BINARY}-cli"
    printf '\nDone. Try:\n\n  run up uptime-kuma\n\n'
    exit 0
  fi
  err "no prebuilt binary for ${arch}-${os}, and cargo is not installed.
  Install Rust (https://rustup.rs) and re-run, or build from source:
  cargo install --git https://github.com/${REPO} ${BINARY}-cli"
}

# --- detect platform (matches the release asset target triples) ------------
case "$os" in
  Linux) target_os="unknown-linux-gnu" ;;
  Darwin) target_os="apple-darwin" ;;
  *) cargo_fallback ;;
esac

case "$arch" in
  x86_64 | amd64) target_arch="x86_64" ;;
  aarch64 | arm64) target_arch="aarch64" ;;
  *) cargo_fallback ;;
esac

target="${target_arch}-${target_os}"

# --- install directory -----------------------------------------------------
if [ -n "${RUN_INSTALL_DIR:-}" ]; then
  install_dir="$RUN_INSTALL_DIR"
elif [ "$(id -u)" = "0" ]; then
  install_dir="/usr/local/bin"
else
  install_dir="${HOME}/.local/bin"
fi

# --- resolve download url --------------------------------------------------
if [ "$VERSION" = "latest" ]; then
  url="https://github.com/${REPO}/releases/latest/download/${BINARY}-${target}.tar.gz"
else
  url="https://github.com/${REPO}/releases/download/${VERSION}/${BINARY}-${target}.tar.gz"
fi

# --- download + extract (fall back to source on failure) -------------------
tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT

printf 'Installing %s for %s...\n' "$BINARY" "$target"

if command -v curl >/dev/null 2>&1; then
  curl -fsSL "$url" -o "${tmp_dir}/${BINARY}.tar.gz" || cargo_fallback
elif command -v wget >/dev/null 2>&1; then
  wget -qO "${tmp_dir}/${BINARY}.tar.gz" "$url" || cargo_fallback
else
  err "need curl or wget to download run"
fi

tar -xzf "${tmp_dir}/${BINARY}.tar.gz" -C "$tmp_dir" || err "could not extract ${BINARY}.tar.gz"

# --- install ---------------------------------------------------------------
mkdir -p "$install_dir"
mv "${tmp_dir}/${BINARY}" "${install_dir}/${BINARY}"
chmod +x "${install_dir}/${BINARY}"

info "Installed ${BINARY} to ${install_dir}/${BINARY}"

# --- PATH hint -------------------------------------------------------------
case ":${PATH}:" in
  *":${install_dir}:"*) ;;
  *) info "Add ${install_dir} to your PATH:  export PATH=\"${install_dir}:\$PATH\"" ;;
esac

printf '\nDone. Try:\n\n  run up uptime-kuma\n\n'
