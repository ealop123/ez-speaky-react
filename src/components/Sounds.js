import "./Sounds.css";
import React, {useState, useEffect} from "react";

const wait = t => new Promise(r => setTimeout(r, t));
const fetchSounds = () => wait(200);
function classFormat(obj) {
  const entries = Object.entries(obj);
  const includedEntries = entries.filter(([,include]) => include);
  const values = includedEntries.map(([val]) => val);
  return values.join(" ");
}

const Button = (props) => {
  const {sound, color} = props;
  function speak() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = sound;
    speechSynthesis.speak(msg);
  }
  return (
    <div
      className={classFormat({
        button: true
      })}
      style={{backgroundColor: color}}>
      <div
        onClick={speak}>
        {sound}
      </div>
    </div>
  )
}

const Sounds = (props) => {
  const [soundList, setSoundList] = useState([]);
  useEffect(async () => {
    await fetchSounds();
    setSoundList([
      {sound: "Test 1", color: "#B07156"},
      {sound: "Test 2", color: "#AB4E68"},
      {sound: "Test 3", color: "#533745"},
      {sound: "The fitness gram pacer test is a multi", color: "#533745"},
    ])
  }, []);

  return (
    <div className={classFormat({
      sounds: true
    })}>
      {
        soundList.map(s => <Button {...s} />)
      }
    </div>
  );
}

export default Sounds;
