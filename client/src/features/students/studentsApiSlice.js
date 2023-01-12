import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const studentsAdapter = createEntityAdapter({});

const initialState = studentsAdapter.getInitialState();

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/students",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 10,
      transformResponse: (responseData) => {
        const loadedStudents = responseData.map((student) => {
          // eslint-disable-next-line no-self-assign
          student.id = student.id;
          return student;
        });
        return studentsAdapter.setAll(initialState, loadedStudents);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Student", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Student", id })),
          ];
        } else return [{ type: "Student", id: "LIST" }];
      },
    }),
    addNewStudent: builder.mutation({
      query: (initialStudentData) => ({
        url: "/students",
        method: "POST",
        body: {
          ...initialStudentData,
        },
      }),
      invalidatesTags: [{ type: "Student", id: "LIST" }],
    }),
    updateStudent: builder.mutation({
      query: (initialStudentData) => ({
        url: "/students",
        method: "PATCH",
        body: {
          ...initialStudentData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Student", id: arg.id }],
    }),
    deleteStudent: builder.mutation({
      query: ({ id }) => ({
        url: "/students",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Student", id: arg.id }],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useAddNewStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApiSlice;

// returns the query result object
export const selectStudentsResult = studentsApiSlice.endpoints.getStudents.select();

// creates memoized selector
const selectStudentsData = createSelector(
  selectStudentsResult,
  (studentsResult) => studentsResult.data // normalized state object with ids & entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllStudents,
  selectById: selectStudentById,
  selectIds: selectStudentIds,
  // pass in the selector that returns the users slice of state
} = studentsAdapter.getSelectors((state) => selectStudentsData(state) ?? initialState);
