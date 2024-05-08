import RootLayout from "../app/layout";
import { ChatUI } from "./chat-ui/chat-ui";

export default function UploadPage() {
        return (
            <div className={`min-h-screen bg-slate-950 flex items-center place-content-center overflow-hidden ${inter.className}`}            >
            <form action="/api/upload" method="post" encType="multipart/form-data">
                <input type="file" name="file" />
                <button type="submit">Upload</button>
            </form>
            </div>
        );
    }
