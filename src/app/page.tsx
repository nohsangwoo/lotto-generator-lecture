"use client";
import { useState } from "react";

export default function Home() {
    // useState 선언.
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");
    return (
        <div className="border">
            <div>
                <div>카운트: {count}</div>
                <button onClick={() => setCount(count + 1)}>증가 버튼</button>
                <button onClick={() => setCount(count - 1)}>감소 버튼</button>
            </div>
            <div>
                <div>입력된 텍스트: {text}</div>
                <input
                    className="border"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
        </div>
    );
}
