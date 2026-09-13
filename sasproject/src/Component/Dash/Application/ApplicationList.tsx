"use client";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useMemo, useState } from "react";

import { supabase } from "@/Lib/Supabase";
import { Application } from "@/Lib/applicationTypes";
import ApplicationStatusChip from "./ApplicationStatusChip";


interface ApplicationListProps {
  search: string;
  status: string;
}


export default function ApplicationList({
  search,
  status,
}: ApplicationListProps) {

  const [applications, setApplications] =
    useState<Application[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  const [openEdit, setOpenEdit] =
    useState(false);


  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);



  const loadApplications = async () => {

    setLoading(true);
    setError("");

    try {

      const {
        data: { user },
      } = await supabase.auth.getUser();


      if (!user) {

        setError(
          "Please sign in to view your applications."
        );

        return;

      }



      const {
        data,
        error: fetchError,
      } = await supabase
        .from("applications")
        .select("*")
        .eq(
          "user_id",
          user.id
        )
        .order(
          "created_at",
          {
            ascending:false,
          }
        );



      if(fetchError){

        setError(fetchError.message);

        return;

      }



      setApplications(
        (data as Application[]) ?? []
      );



    } catch {

      setError(
        "Something went wrong while loading applications."
      );


    } finally {

      setLoading(false);

    }

  };




  useEffect(()=>{

    loadApplications();

  },[]);





  const filteredApplications = useMemo(()=>{

    return applications.filter(
      (application)=>{

        const value =
          search.toLowerCase();


        const matchesSearch =
          application.company
            .toLowerCase()
            .includes(value)
          ||
          application.job_title
            .toLowerCase()
            .includes(value);



        const matchesStatus =
          status === "All"
          ||
          application.status === status;



        return (
          matchesSearch &&
          matchesStatus
        );

      }
    );


  },[
    applications,
    search,
    status
  ]);






  const handleEdit = (
    application:Application
  )=>{

    setSelectedApplication(application);

    setOpenEdit(true);

  };







  const handleUpdate = async()=>{


    if(!selectedApplication)
      return;



    const {
      data,
      error:updateError
    } = await supabase
      .from("applications")
      .update({

        company:selectedApplication.company,

        job_title:selectedApplication.job_title,

        location:selectedApplication.location,

        status:selectedApplication.status,

        applied_date:selectedApplication.applied_date,

        job_url:selectedApplication.job_url,

      })
      .eq(
        "id",
        selectedApplication.id
      )
      .select()
      .single();



    if(updateError){

      setError(updateError.message);

      return;

    }



    setApplications(
      current =>
        current.map(
          item =>
            item.id === data.id
              ? data
              : item
        )
    );



    setOpenEdit(false);


  };







  const handleDelete = async(
    id:string
  )=>{


    const confirmed =
      window.confirm(
        "Are you sure you want to delete this application?"
      );



    if(!confirmed)
      return;



    const {
      error:deleteError
    } = await supabase
      .from("applications")
      .delete()
      .eq(
        "id",
        id
      );



    if(deleteError){

      setError(deleteError.message);

      return;

    }



    setApplications(
      current =>
        current.filter(
          item =>
            item.id !== id
        )
    );


  };






  if(loading){

    return(

      <Box
        sx={{
          minHeight:250,
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
        }}
      >

        <CircularProgress
          sx={{
            color:"#2563EB"
          }}
        />

      </Box>

    );

  }





  if(error){

    return(

      <Alert
        severity="error"
        sx={{
          borderRadius:"12px"
        }}
      >
        {error}
      </Alert>

    );

  }  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#111827",
          border: "1px solid #1E293B",
          borderRadius: "16px",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>

              <TableCell
                sx={{
                  color:"#64748B",
                  fontWeight:700,
                }}
              >
                Company
              </TableCell>

              <TableCell
                sx={{
                  color:"#64748B",
                  fontWeight:700,
                }}
              >
                Position
              </TableCell>

              <TableCell
                sx={{
                  color:"#64748B",
                  fontWeight:700,
                }}
              >
                Location
              </TableCell>

              <TableCell
                sx={{
                  color:"#64748B",
                  fontWeight:700,
                }}
              >
                Status
              </TableCell>

              <TableCell
                sx={{
                  color:"#64748B",
                  fontWeight:700,
                }}
              >
                Applied
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  color:"#64748B",
                  fontWeight:700,
                }}
              >
                Actions
              </TableCell>

            </TableRow>
          </TableHead>


          <TableBody>

            {filteredApplications.length === 0 ? (

              <TableRow>

                <TableCell colSpan={6}>

                  <Box
                    sx={{
                      py:7,
                      textAlign:"center",
                    }}
                  >

                    <Typography
                      sx={{
                        color:"#F8FAFC",
                        fontWeight:600,
                        fontSize:"17px",
                      }}
                    >
                      No applications found
                    </Typography>


                    <Typography
                      sx={{
                        color:"#64748B",
                        mt:1,
                      }}
                    >
                      Add your first job application to get started.
                    </Typography>

                  </Box>

                </TableCell>

              </TableRow>

            ) : (

              filteredApplications.map(
                (application)=>(

                <TableRow
                  key={application.id}
                  sx={{
                    "&:hover":{
                      backgroundColor:"#0F172A",
                    },
                  }}
                >

                  <TableCell
                    sx={{
                      color:"#F8FAFC",
                      fontWeight:600,
                      whiteSpace:"nowrap",
                    }}
                  >
                    {application.company}
                  </TableCell>


                  <TableCell
                    sx={{
                      color:"#CBD5E1",
                      minWidth:180,
                    }}
                  >
                    {application.job_title}
                  </TableCell>


                  <TableCell
                    sx={{
                      color:"#94A3B8",
                    }}
                  >
                    {application.location || "—"}
                  </TableCell>


                  <TableCell>

                    <ApplicationStatusChip
                      status={application.status}
                    />

                  </TableCell>


                  <TableCell
                    sx={{
                      color:"#94A3B8",
                      whiteSpace:"nowrap",
                    }}
                  >
                    {application.applied_date || "—"}
                  </TableCell>



                  <TableCell align="right">

                    <Box
                      sx={{
                        display:"flex",
                        justifyContent:"flex-end",
                        alignItems:"center",
                        gap:0.5,
                      }}
                    >


                      {application.job_url && (

                        <IconButton
                          component="a"
                          href={application.job_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color:"#94A3B8",
                            "&:hover":{
                              color:"#60A5FA",
                              backgroundColor:"#1E293B",
                            },
                          }}
                        >

                          <OpenInNewIcon
                            fontSize="small"
                          />

                        </IconButton>

                      )}



                      <IconButton
                        onClick={() =>
                          handleEdit(application)
                        }
                        sx={{
                          color:"#94A3B8",
                          "&:hover":{
                            color:"#60A5FA",
                            backgroundColor:"#1E293B",
                          },
                        }}
                      >

                        <EditOutlinedIcon
                          fontSize="small"
                        />

                      </IconButton>




                      <IconButton
                        onClick={() =>
                          handleDelete(application.id)
                        }
                        sx={{
                          color:"#94A3B8",
                          "&:hover":{
                            color:"#F87171",
                            backgroundColor:"#1E293B",
                          },
                        }}
                      >

                        <DeleteOutlineOutlinedIcon
                          fontSize="small"
                        />

                      </IconButton>


                    </Box>

                  </TableCell>


                </TableRow>

              ))

            )}

          </TableBody>

        </Table>

      </TableContainer>




      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullWidth
        maxWidth="sm"
      >

        <DialogTitle>
          Edit Application
        </DialogTitle>



        <DialogContent
          sx={{
            display:"flex",
            flexDirection:"column",
            gap:2,
            mt:1,
          }}
        >

          <TextField
            label="Company"
            value={
              selectedApplication?.company || ""
            }
            onChange={(e)=>
              setSelectedApplication({
                ...selectedApplication!,
                company:e.target.value,
              })
            }
          />



          <TextField
            label="Position"
            value={
              selectedApplication?.job_title || ""
            }
            onChange={(e)=>
              setSelectedApplication({
                ...selectedApplication!,
                job_title:e.target.value,
              })
            }
          />



          <TextField
            label="Location"
            value={
              selectedApplication?.location || ""
            }
            onChange={(e)=>
              setSelectedApplication({
                ...selectedApplication!,
                location:e.target.value,
              })
            }
          />



          <TextField
            label="Status"
            value={
              selectedApplication?.status || ""
            }
            onChange={(e)=>
              setSelectedApplication({
                ...selectedApplication!,
                status:e.target.value,
              })
            }
          />



          <TextField
            label="Applied Date"
            value={
              selectedApplication?.applied_date || ""
            }
            onChange={(e)=>
              setSelectedApplication({
                ...selectedApplication!,
                applied_date:e.target.value,
              })
            }
          />



          <TextField
            label="Job URL"
            value={
              selectedApplication?.job_url || ""
            }
            onChange={(e)=>
              setSelectedApplication({
                ...selectedApplication!,
                job_url:e.target.value,
              })
            }
          />


        </DialogContent>




        <DialogActions>

          <Button
            onClick={() => setOpenEdit(false)}
          >
            Cancel
          </Button>


          <Button
            variant="contained"
            onClick={handleUpdate}
          >
            Save Changes
          </Button>


        </DialogActions>


      </Dialog>

    </>
  );
}