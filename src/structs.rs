use serde::{Serialize, Deserialize};

#[derive(Deserialize)]
pub struct LoginForm {
    pub username: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct Video {
    pub url: String,
    pub thumbnail: String,
    pub creator: String,
    pub title: String,
}
