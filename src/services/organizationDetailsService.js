import axios from "axios";
import { API_BASE_URL } from "../constants";
// lấy thông tin chi tiết của tổ chức
const fetchOrganizationDetails = async (orgId) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${API_BASE_URL}/organizations/${orgId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data.data;
};
// thêm thành viên vào tổ chức
const addMember = async (orgId, memberCode) => {
  const token = localStorage.getItem("token");
  await axios.post(
    `${API_BASE_URL}/organizations/add-user`,
    {
      organizationId: orgId,
      userId: memberCode,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const removeMember = async (orgId, memberId) => {
  const token = localStorage.getItem("token");
  await axios.post(
    `${API_BASE_URL}/organizations/remove-user`,
    {
      organizationId: orgId,
      userId: memberId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export { fetchOrganizationDetails, addMember, removeMember };
