// axios là một thư viện JavaScript phổ biến giúp gửi các yêu cầu HTTP (GET, POST, PUT, DELETE,...) 
//từ ứng dụng frontend tới backend API. Nó được sử dụng để trao đổi dữ liệu giữa client (giao diện) và server (máy chủ).
// axios.create(): Bạn tạo một instance của axios với URL gốc (baseURL là http://localhost:8080),
// đây là địa chỉ của server backend mà bạn sẽ gửi các request tới.
// addRoom(): Hàm này sử dụng axios để gửi yêu cầu HTTP POST tới backend. 
//Dữ liệu về phòng (gồm photo, roomType, roomPrice) sẽ được gửi đến endpoint /rooms của backend server, 
//giúp thêm một phòng mới vào cơ sở dữ liệu.
import axios from "axios"

export const api = axios.create({
    baseURL :"http://localhost:8080"
})

// Hàm này dùng để gửi yêu cầu HTTP POST tới backend với dữ liệu về phòng (photo, roomType, roomPrice). Dữ liệu được gửi dưới dạng FormData.
// Sau khi gửi yêu cầu tới endpoint /rooms/add/new-room, nếu status trả về là 201 (Created), hàm sẽ trả về true, ngược lại trả về false.
// this function adds a new room to the database
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    try {
        const response = await api.post("/rooms/add/new-room", formData);
        console.log("Response from API: ", response.data); // Ghi lại dữ liệu phản hồi
        
        // Kiểm tra nếu response.data có trường id
        if (response.status === 200 && response.data.id) {
            return true;
        } else {
            return false;
        }
        
    } catch (error) {
        console.error("Error adding room: ", error.response ? error.response.data : error.message);
        throw error; // Ném lại lỗi để có thể xử lý ở nơi khác
    }
}
// this function gets all room types from thee database (chức năng này lấy tất cả các loại phòng từ cơ sở dữ liệu)
// Hàm này sử dụng yêu cầu HTTP GET để lấy tất cả các loại phòng từ backend bằng cách gọi tới endpoint /rooms/room-types.
// Nếu có lỗi xảy ra trong quá trình gửi yêu cầu, nó sẽ ném ra một lỗi với thông báo cụ thể.
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/types");
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching room types: ${error.message}`);
    }
}

// This function gets all rooms from the database
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms")
        return result.data
    }
    catch (error) {
        throw new Error("Error fetching rooms")
    }
}

