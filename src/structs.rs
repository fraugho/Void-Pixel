use serde::{Serialize, Deserialize};

#[derive(Deserialize)]
pub struct LoginForm {
    username: String,
    password: String,
}
