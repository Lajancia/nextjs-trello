"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form"; // 폼 생성을 위한 import
import { TextField, Button } from "@mui/material"; // MUI 라이브러리

// Form에 입력된 데이터를 받을 Inputs 인터페이스 지정
interface Inputs {
  id: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("login proceed", data);
  };

  const watchID = watch("id");

  useEffect(() => {
    console.log(watchID); // watch를 통해 "example"에 데이터가 전달되는지 체크
  }, [watchID]);

  return (
    /* "handleSubmit"이 onSubmit 동작 되기 전에 inputs을 식별 */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* "register" 함수로 example 변수에 데이터 저장
          MUI 텍스트필드 사용
      */}
      <TextField
        defaultValue=""
        {...register("id")}
        variant="outlined"
        label="ID"
        fullWidth
        margin="normal"
      />

      {/* 추가적인 제약조건 지정 (반드시 데이터를 입력해야 하는 폼) */}
      <TextField
        {...register("password", { required: true })}
        variant="outlined"
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        error={Boolean(errors.password)}
        helperText={errors.password && "This field is required"}
      />

      {/* MUI 버튼 사용 */}
      <Button type="submit" variant="contained" color="primary">
        SUBMIT
      </Button>
    </form>
  );
};

export default Login;
