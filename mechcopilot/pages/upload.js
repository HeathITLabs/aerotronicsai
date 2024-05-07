
import RootLayout from "../app/layout";

export default function UploadPage() {
        return (
            
            <form action="/api/upload" method="post" encType="multipart/form-data">
                <input type="file" name="file" />
                <button type="submit">Upload</button>
            </form>
            
        );
    }
