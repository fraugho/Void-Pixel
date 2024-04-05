use axum::{
    routing::{get, post, get_service},
    http::StatusCode,
    response::*,
    Json, Router,
    extract::Multipart,
};
use tokio::fs::File;
use std::process::Command;
use serde::{Deserialize, Serialize};
use tower_http::services::ServeDir;
use std::path::Path;
use std::fs::read_to_string;
use futures::TryStreamExt as _;
use tokio::io::AsyncWriteExt;

mod structs;
use structs::*;

#[tokio::main]
async fn main() {
    // initialize tracing
    tracing_subscriber::fmt::init();

    // build our application with a route
    let app = Router::new()
        // `GET /` goes to `root`
        .route("/", get(main_page))
        .route("/video", get(video_page))
        .route("/file_upload", post(file_upload))
        .nest_service("/static", get_service(ServeDir::new("static")).handle_error(|error| async move {
            (
                axum::http::StatusCode::INTERNAL_SERVER_ERROR,
                format!("Unhandled internal error: {}", error),
            )
        }));

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("127.0.0.1:8080").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

fn routes_static() -> Router {
    Router::new()
        .nest_service("/", get_service(ServeDir::new("./")))
}

async fn main_page() -> Result<Html<String>, (StatusCode, String)> {
    let path = "static/HTML/home_page.html";
    match read_to_string(path) {
        Ok(content) => Ok(Html(content)),
        Err(err) => {
            println!("Failed to read login_page HTML: {:?}", err);
            Err((StatusCode::INTERNAL_SERVER_ERROR, "Internal Server Error".into()))
        }
    }
}


async fn login(Form(login_form): Form<LoginForm>) -> impl IntoResponse {
    (StatusCode::OK, "wuba wuba dub dub")
}


async fn create_login(Form(login_form): Form<LoginForm>) -> impl IntoResponse {
    (StatusCode::OK, "wuba wuba dub dub")
}

async fn video_page() -> Result<Html<String>, (StatusCode, String)> {
    let path = "static/HTML/video.html";
    match read_to_string(path){
        Ok(content) => Ok(Html(content)),
        Err(err) => {
            println!("Failed to read video_page HTML: {:?}", err);
            Err((StatusCode::INTERNAL_SERVER_ERROR, "Internal Server Error".into()))
        }
    }
}

async fn convert_to_hls(input_path: &str, output_dir: &str) -> std::io::Result<()> {

    // Construct the FFmpeg command
    Command::new("ffmpeg")
        .args([
            "-i", input_path, // Input file
            "-profile:v", "baseline", // Baseline profile for compatibility
            "-level", "3.0",
            "-s", "640x360", // Scale video to 640x360
            "-start_number", "0", // Start numbering segments at 0
            "-hls_time", "10", // 10-second segments
            "-hls_list_size", "0", // Unlimited playlist size
            "-f", "hls", // HLS format
            "static/HLS/index.m3u8", // Output playlist
        ])
        .output()?;

    Ok(())
}

async fn file_upload(mut multipart: Multipart) {
    while let Some(field) = multipart
        .next_field().await.expect("Failed to get next field!")
    {
        let file_name = match field.file_name() {
            Some(file_name) => file_name,
            None => continue,
        };
        

        // Create a path for the soon-to-be file
        let file_path = format!("static/uploads/{}", file_name);
        
        // Unwrap the incoming bytes
        let data = field.bytes()
            .await.unwrap();

        // Open a handle to the file
        let mut file_handle = File::create(file_path)
            .await
            .expect("Failed to open file handle!");

        // Write the incoming data to the handle
        file_handle.write_all(&data)
            .await
            .expect("Failed to write to file!");
    }
}


