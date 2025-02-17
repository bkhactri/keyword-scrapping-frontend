import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AuthenticateLayout from "@components/Layout/AuthenticateLayout";
import { useAuth } from "@contexts/useAuthContext";
import { UserSignInPayload } from "@interfaces/user.interface";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function SignIn() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signInSchema) });
  const { login, isLoading, error } = useAuth();

  const onSubmit = async (payload: UserSignInPayload) => {
    await login(payload, navigate);
  };

  return (
    <AuthenticateLayout>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign in
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel
            htmlFor="email"
            sx={{ marginBottom: "5px" }}
            data-testid="sign-in-email-field"
          >
            Email
          </FormLabel>
          <TextField
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message as string}
            id="email"
            type="email"
            placeholder="who@gmail.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={errors.email ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <FormLabel
            htmlFor="password"
            sx={{ marginBottom: "5px" }}
            data-testid="sign-in-password-field"
          >
            Password
          </FormLabel>
          <TextField
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message as string}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={errors.password ? "error" : "primary"}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            zIndex: 1,
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="secondary" sx={{ zIndex: 0 }} />
          ) : (
            "Sign in"
          )}
        </Button>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography sx={{ textAlign: "center" }}>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </Typography>
      </Box>
    </AuthenticateLayout>
  );
}
