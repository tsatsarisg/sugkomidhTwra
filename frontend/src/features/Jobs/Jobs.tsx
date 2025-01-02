import React, { useState } from "react";
import { useRouteLoaderData, useSubmit } from "react-router";
import classes from "./Jobs.module.css";
import { Job } from "../../types";
import CreateJobForm from "./CreateJobForm/CreateJobForm";
import Modal from "../../components/Modal/Modal";
import PaginationControls from "../../components/PaginationControls/PaginationControls";

const PaginatedJobsPage: React.FC = () => {
  const submit = useSubmit();
  const [currentPage, setCurrentPage] = useState(1);

  const { jobs, total } = useRouteLoaderData<{ jobs: Job[]; total: number }>(
    "jobs-page"
  )!;
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const jobsPerPage = 8;

  if (jobs.length === 0) {
    return <p>No jobs available at the moment.</p>;
  }

  const totalPages = Math.ceil(total / jobsPerPage);

  const newestJobs = jobs.slice(0, 2);
  const otherJobs = jobs.slice(2);

  const openCreateJobModal = () => setIsCreateJobOpen(true);
  const closeCreateJobModal = () => setIsCreateJobOpen(false);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <button
          onClick={openCreateJobModal}
          className="bg-emerald-900 text-white px-4 py-2 rounded-lg hover:bg-emerald-950 transition"
        >
          Create Job
        </button>
      </div>
      <div className={classes.newestJobs}>
        {newestJobs.map((job) => (
          <div key={job.id} className={classes.jobCard}>
            <h2 className={classes.jobCardTitle}>{job.title}</h2>
            <p className={classes.jobCardCompany}>
              {job.company} - {job.location}
            </p>
            <p className={classes.jobCardDescription}>{job.description}</p>
            <p className={classes.jobCardDate}>
              Posted on: {new Date(job.datePosted).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Other Jobs */}
      <div className={classes.otherJobs}>
        {otherJobs.map((job) => (
          <div key={job.id} className={classes.otherJobCard}>
            <h3 className={classes.otherJobCardTitle}>{job.title}</h3>
            <p className={classes.otherJobCardCompany}>
              {job.company} - {job.location}
            </p>
            <p className={classes.otherJobCardDescription}>
              {job.description.length > 80
                ? `${job.description.slice(0, 80)}...`
                : job.description}
            </p>
            <p className={classes.jobCardDate}>
              Posted on: {new Date(job.datePosted).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
      <PaginationControls
        totalPages={totalPages}
        submit={submit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {isCreateJobOpen && (
        <Modal onClose={closeCreateJobModal}>
          <CreateJobForm onClose={closeCreateJobModal} />
        </Modal>
      )}
    </div>
  );
};

export default PaginatedJobsPage;
