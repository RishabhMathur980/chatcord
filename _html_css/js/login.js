const insertData = async (data) => {
  try {
    const url = "http://localhost:3000/insert";
    const res = await axios({
      method: "POST",
      url,
      data,
    });
    if ((res.status = "200")) {
      alert("successfully");
    }
  } catch (err) {
    alert("enter your details again..Try again!!!");
  }
};

document.querySelector(".rishabh").addEventListener("submit", (el) => {
  const username = document.getElementById("username").value;
  const room = document.getElementById("room").value;
  const email = document.getElementById("email").value;

  insertData({ username, room, email });
});
