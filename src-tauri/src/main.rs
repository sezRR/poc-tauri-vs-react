#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{sync::Mutex, thread, time::Duration};
use std::sync::Arc;
use tauri::{Manager, State};

// Create store
#[derive(Default)]
struct Store {
    counter: i32,
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.handle(); // Clone the app handle to move into the thread
            let store = Arc::new(Mutex::new(Store::default()));
            app.manage(store.clone()); // Manage the shared store

            // Spawn a thread to increment the counter every second
            thread::spawn(move || {
                // loop {
                //     thread::sleep(Duration::from_millis(1));
                //     thread::yield_now();

                //     // Increment the counter
                //     let mut state = store.lock().unwrap();
                //     state.counter += 1;

                //     // Emit the updated counter to the frontend
                //     app_handle.emit_all("counter-update", state.counter).unwrap();
                // }

                let mut last_emit = std::time::Instant::now();
                loop {
                    thread::sleep(Duration::from_millis(1)); // Sleep for 10ms
                    let mut state = store.lock().unwrap();
                    state.counter += 1;
                
                    // Emit only once per second
                    if last_emit.elapsed() >= Duration::from_secs(1) {
                        app_handle.emit_all("counter-update", state.counter).unwrap();
                        last_emit = std::time::Instant::now(); // Reset the timer
                    }
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![reset_counter_tick, get_counter_tick])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn reset_counter_tick(store: State<'_, Arc<Mutex<Store>>>) {
    let mut state = store.lock().unwrap();
    state.counter = 0;
}

#[tauri::command]
fn get_counter_tick(store: State<'_, Arc<Mutex<Store>>>) -> i32 {
    let state = store.lock().unwrap(); // Read-only, no need to mutate
    state.counter
}
