import React, { ReactNode, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import CodeIcon from "@mui/icons-material/Code";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { ReportKeyword } from "@interfaces/report.interface";
import { useAuth } from "@contexts/useAuthContext";
import KeyIcon from "@mui/icons-material/Key";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import EventIcon from "@mui/icons-material/Event";
import LinkIcon from "@mui/icons-material/Link";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { toast } from "react-toastify";
import api from "@config/axios-request";
import { KeywordStatus, keywordStatusColor } from "@enums/keyword.enum";

interface ReportItemProps {
  icon: React.ElementType;
  value: string | number | ReactNode;
  label: string;
  preview?: boolean;
}

const ReportItem = ({ icon: Icon, value, label, preview }: ReportItemProps) => {
  const handleOpenHtmlPage = () => {
    const blob = new Blob(["\ufeff", value as string], {
      type: "text/html;charset=utf-8",
    });

    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl, "_blank");

    return () => URL.revokeObjectURL(blobUrl);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        flex: 1,
        p: 2,
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon fontSize="large" sx={{ color: "orange" }} />
      </Box>
      <Stack
        direction="column"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {preview ? (
          <Button
            onClick={handleOpenHtmlPage}
            sx={{
              textTransform: "none",
              color: "orange",
              fontWeight: "bold",
            }}
          >
            {label}
          </Button>
        ) : (
          <Typography sx={{ fontSize: "16px" }} fontWeight="bold">
            {value}
          </Typography>
        )}

        {!preview && (
          <Typography sx={{ color: "gray", fontSize: "14px" }}>
            {label}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

interface KeywordDetailModalProps {
  isOpen: boolean;
  keywordId: number;
  handleClose: () => void;
}

export default function KeywordDetailModal({
  isOpen,
  keywordId,
  handleClose,
}: KeywordDetailModalProps) {
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reportKeyword, setReportKeyword] = useState<ReportKeyword>(null);

  useEffect(() => {
    const fetchReportKeyword = async () => {
      setIsLoading(true);
      try {
        const response = await api.get<ReportKeyword>(
          `/report/${keywordId}/detail`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response?.data) {
          setReportKeyword(response.data);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    };

    if (keywordId) {
      fetchReportKeyword();
    }
  }, [accessToken, keywordId]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          minWidth: "800px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflow: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          px: 10,
          py: 5,
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress sx={{ color: "orange" }} />
          </Box>
        ) : (
          <Box>
            <Box
              sx={{
                position: "absolute",
                top: 25,
                right: 20,
                cursor: "pointer",
              }}
              onClick={handleClose}
            >
              <CloseIcon fontSize="large" />
            </Box>
            <Typography variant="h5" sx={{ color: "orange" }}>
              Keyword overview
            </Typography>
            <Box
              sx={{
                mt: 4,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <ReportItem
                icon={KeyIcon}
                value={reportKeyword?.keyword}
                label="Keyword"
              />

              <ReportItem
                icon={TaskAltIcon}
                value={
                  <Typography
                    className="h-full flex justify-center items-center"
                    sx={{ textTransform: "capitalize", fontWeight: "bold" }}
                    color={
                      keywordStatusColor[reportKeyword?.status as KeywordStatus]
                    }
                  >
                    {reportKeyword?.status}
                  </Typography>
                }
                label="Status"
              />
            </Box>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <ReportItem
                icon={LinkIcon}
                value={reportKeyword?.totalLinks}
                label="Total links"
              />

              <ReportItem
                icon={NewspaperIcon}
                value={reportKeyword?.totalAds}
                label="Total Ads"
              />

              <ReportItem
                icon={EventIcon}
                value={new Date(reportKeyword?.createdAt).toLocaleDateString()}
                label="Uploaded date"
              />
            </Box>

            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <ReportItem
                icon={CodeIcon}
                value={reportKeyword?.htmlCachePage}
                preview
                label="Preview page cache"
              />
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
