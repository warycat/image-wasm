use photon_rs::PhotonImage;
use wasm_bindgen::prelude::*;
use wasm_bindgen::Clamped;
use web_sys::console;
use web_sys::{CanvasRenderingContext2d, Document, HtmlCanvasElement, ImageData, Window};
// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// This is like the `main` function, except for JavaScript.
#[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
    // This provides better error messages in debug mode.
    // It's disabled in release mode so it doesn't bloat up the file size.
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();
    Ok(())
}

#[wasm_bindgen]
pub fn grey(image_data: ImageData) -> ImageData {
    let w = image_data.width();
    let h = image_data.height();
    let data: Clamped<Vec<u8>> = image_data.data();
    let mut pimage = PhotonImage::new(data.to_vec(), w, h);
    photon_rs::effects::tint(&mut pimage, 100, 20, 15);
    // photon_rs::filters::filter(&mut pimage, "rosetint");
    pimage.get_image_data()
}
