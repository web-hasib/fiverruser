
import { SingleUserResponseDataType, UserProfileResponse, UserResponseDataType } from "@/src/types/userTypes/userTypes";
import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  overrideExisting: true, // ✅ add this
  endpoints: (builder) => ({
    // get all users
    getAllUsers: builder.query<
      UserResponseDataType,
      { page: string; limit: string }
    >({
      query: ({ page, limit }) => ({
        url: `/dashboard/users?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
//hello world
    // get selected user
    getUsersbyId: builder.query<UserResponseDataType, Record<string, string>>({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Get me
    getMe: builder.query<SingleUserResponseDataType, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Update user (uses existing update endpoint)
    updateUser: builder.mutation({
      query: ({ body, id }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // Get job seeker profile

    getMyProfile: builder.query<UserProfileResponse, void>({
      query: () => ({
        url: `/users/profile`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

  
    // Delete user (uses existing delete endpoint)
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),


     forgotPassword: builder.mutation({
      query: (body: any) => ({
        url: "/otp/send",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

     resetPassword: builder.mutation({
      query: (body: any) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    verifyOtp: builder.mutation({
      query: (body: any) => ({
        url: "/otp/verify",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    //  update admin contact info
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUsersbyIdQuery,
  useGetMeQuery,
  useGetMyProfileQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation
} = userApi;
