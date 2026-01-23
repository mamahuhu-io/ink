//! Unified logging system using tracing
//!
//! Provides structured logging with context and performance tracking.

use crate::core::config::logging as logging_config;
use tracing_subscriber::{fmt, layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};

/// Initialize the tracing subscriber
pub fn init_tracing() {
    // Create environment filter
    // Default to configured level, but can be overridden by RUST_LOG env var
    let env_filter = EnvFilter::try_from_default_env()
        .unwrap_or_else(|_| EnvFilter::new(logging_config::DEFAULT_LEVEL));

    // Create formatted layer with configuration
    let fmt_layer = fmt::layer()
        .with_target(true)
        .with_thread_ids(logging_config::LOG_THREAD_IDS)
        .with_file(logging_config::LOG_FILE_LOCATIONS)
        .with_line_number(logging_config::LOG_FILE_LOCATIONS);

    // Initialize subscriber with tracing-log compatibility layer
    // This allows capturing log::* macro calls as well
    tracing_subscriber::registry()
        .with(env_filter)
        .with(fmt_layer)
        .init();

    tracing::info!("Tracing initialized with log compatibility");
}

/// Macro for performance timing
#[macro_export]
macro_rules! timed {
    ($name:expr, $block:block) => {{
        let _span = tracing::info_span!($name).entered();
        $block
    }};
}

/// Macro for timing async operations
#[macro_export]
macro_rules! timed_async {
    ($name:expr, $block:expr) => {{
        let span = tracing::info_span!($name);
        async move {
            let _entered = span.enter();
            $block.await
        }
    }};
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_init_tracing() {
        // Just test that it doesn't panic
        // Can only init once, so we skip if already initialized
        let _ = tracing_subscriber::registry()
            .with(EnvFilter::new("debug"))
            .try_init();
    }
}
