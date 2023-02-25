import axios from "axios";

export async function setSession(userId: string) {
    try {
      const resp = await axios.post(`/api/session/${encodeURIComponent(userId)}`,{});
      return { status: resp.status, data: resp.data };
    } catch (error: any) {
      return { status: error.response.status || error.request.code, data: null };
    }
}

export async function deleteSession(userId: string) {
    try {
      const resp = await axios.delete(`/api/session/${encodeURIComponent(userId)}`,);
      return { status: resp.status, data: resp.data };
    } catch (error: any) {
      return { status: error.response.status || error.request.code, data: null };
    }
}