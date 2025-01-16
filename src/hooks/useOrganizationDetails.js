import { useState, useEffect } from "react";
import { fetchOrganizationDetails, addMember, removeMember } from "../services/organizationDetailsService";

const useOrganizationDetails = (orgId) => {
  const [organization, setOrganization] = useState(null);
  const [memberCode, setMemberCode] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");

  useEffect(() => {
    const getOrganizationDetails = async () => {
      try {
        const data = await fetchOrganizationDetails(orgId);
        setOrganization(data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết tổ chức:", error);
        setError("Không thể tải thông tin tổ chức. Vui lòng thử lại.");
      }
    };
    getOrganizationDetails();
  }, [orgId]);

  const handleAddMember = async () => {
    if (!memberCode) {
      setError("Vui lòng nhập mã thành viên.");
      return;
    }

    try {
      await addMember(orgId, memberCode);
      setSuccessMessage("Thêm thành viên thành công!");
      setMemberCode(""); // Reset mã thành viên sau khi thêm thành công
    } catch (error) {
      console.error("Lỗi khi thêm thành viên:", error);
      setError("Không thể thêm thành viên. Vui lòng thử lại.");
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await removeMember(orgId, memberId);
      setDeleteSuccessMessage("Đã xóa thành viên khỏi tổ chức!");

      // Cập nhật lại danh sách thành viên sau khi xóa
      const updatedOrganization = { ...organization };
      updatedOrganization.members = updatedOrganization.members.filter(
        (member) => member._id !== memberId
      );
      setOrganization(updatedOrganization);
    } catch (error) {
      console.error("Lỗi khi xóa thành viên:", error);
      setDeleteError("Không thể xóa thành viên. Vui lòng thử lại.");
    }
  };

  return {
    organization,
    memberCode,
    setMemberCode,
    error,
    successMessage,
    deleteError,
    deleteSuccessMessage,
    handleAddMember,
    handleRemoveMember,
  };
};

export default useOrganizationDetails;
