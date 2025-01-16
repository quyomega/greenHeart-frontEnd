import axios from "axios";
import { API_BASE_URL } from "../constants";

const fetchOrganizationDetails = async (orgId) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${API_BASE_URL}/organizations/${orgId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

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
    "http://localhost:5000/api/organizations/remove-user",
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
