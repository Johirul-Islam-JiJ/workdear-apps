import { JobPostForm } from "@/types/Job";
import { createSlice } from "@reduxjs/toolkit";

const initialState: JobPostForm = {
  jobPostFirstForm: {
    title: "",
    description: "",
    steps: JSON.stringify([{ step_number: 1, instruction: "" }]),
    required_proofs: JSON.stringify([{ type: "", description: "" }]),
    question_condition: JSON.stringify([
      {
        id: 1,
        answer_type: "",
        text: "",
        condition: {
          operator: "",
          value: "",
        },
      },
    ]),
    thumbnail: undefined,
  },
  jobPostFinalForm: {
    status: "DRAFT",
    total_workers_required: 0,
    pay_per_task: 0,
    require_screenshots: 0,
    estimated_day: 0,
    job_category_id: null,
    job_sub_category_id: null,
    country_ids: [],
    minimum_pay: "",
  },
};

type JobFormState = {
  jobPostFirstForm: JobPostForm["jobPostFirstForm"];
  jobPostFinalForm: JobPostForm["jobPostFinalForm"];
  isUpdate: boolean;
  jobId: number | null;
};

export const jobForm = createSlice({
  name: "jobForm",
  initialState: {
    jobPostFirstForm: initialState.jobPostFirstForm,
    jobPostFinalForm: initialState.jobPostFinalForm,
    isUpdate: false,
    jobId: null,
  } as JobFormState,
  reducers: {
    setJobPostFirstForm: (state, action) => {
      state.jobPostFirstForm = action.payload;
    },
    setJobPostFinalForm: (state, action) => {
      state.jobPostFinalForm = action.payload;
    },
    setClearJobPostForm: (state) => {
      state.jobPostFinalForm = initialState.jobPostFinalForm;
      state.jobPostFirstForm = initialState.jobPostFirstForm;
    },
    setIsUpdate: (state, action) => {
      state.isUpdate = action.payload;
    },
    setJobId: (state, action) => {
      state.jobId = action.payload;
    },
  },
});

export const {
  setJobPostFirstForm,
  setJobPostFinalForm,
  setClearJobPostForm,
  setIsUpdate,
  setJobId,
} = jobForm.actions;

export default jobForm.reducer;
