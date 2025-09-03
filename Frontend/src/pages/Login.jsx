// src/pages/Login.jsx
import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { PrimaryButton } from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const GlobalStyle = createGlobalStyle`
  html, body, #root { height: 100%; margin: 0; padding: 0; }
  body { background:#fafafa; font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial; }
  * { box-sizing: border-box; }
`;

const Section = styled.section`
  height: 100vh;
  display: grid;
  place-content: center;
  padding: 24px;
  overflow: hidden;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const LogoBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: #0b0b14;
  color: #fff;
  font-weight: 800;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
`;

const H1 = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
`;

const Lead = styled.p`
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 1rem;
`;

const FormWrap = styled.div`
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  margin: 0 0 6px;
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
`;

const FormDesc = styled.p`
  margin: 0 0 18px;
  color: #6b7280;
  font-size: 0.95rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin: 14px 0 6px;
`;

const InputWrap = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const Icon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.9rem;
  color: #9ca3af;
  pointer-events: none;
`;

const Toggle = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  padding: 6px;
  cursor: pointer;
  color: #6b7280;
`;

const BaseInput = styled.input`
  width: 100%;
  padding: 12px 40px; /* left for icon, right for eye toggle */
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.95rem;
  color: #374151;

  &::placeholder { color: #9ca3af; }

  &:focus {
    border-color: #111827;
    box-shadow: 0 0 0 2px #11182722;
    outline: none;
  }
`;

const RowBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0 16px;
  font-size: 0.9rem;
  color: #374151;

  a {
    color: #111827;
    font-weight: 600;
    text-decoration: underline;
  }

  label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    user-select: none;
    cursor: pointer;
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #111827;
  }
`;

const ErrorText = styled.p`
  margin: 8px 0 0;
  color: #b91c1c;
  font-size: 0.9rem;
`;

export default function Login() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    // super-light validation for UX
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }
    // TODO: replace with real auth call
    // success path:
    navigate("/main/home");
  };

  return (
    <>
      <GlobalStyle />
      <Section>
        <Header>
          <LogoBox>
            <img 
              src="/UniCircle_Logo.png" 
              alt="Unicircle logo" 
              style={{ width: "60%", height: "60%", objectFit: "contain" }}
            />
          </LogoBox>
          <H1>UniCircle Welcome Back!</H1>
          <Lead>Sign in to your Unicircle account</Lead>
        </Header>

        <FormWrap>
          <Card style={{ padding: 24, borderRadius: 16 }}>
            <FormTitle>Sign In</FormTitle>
            <FormDesc>Use your student email and password</FormDesc>

            <form onSubmit={onSubmit}>
              <Label htmlFor="email">Student Email</Label>
              <InputWrap>
                <Icon><FontAwesomeIcon icon={faEnvelope} /></Icon>
                <BaseInput
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your.email@student.uts.edu.au"
                  value={form.email}
                  onChange={onChange}
                  autoComplete="email"
                />
              </InputWrap>

              <Label htmlFor="password">Password</Label>
              <InputWrap>
                <Icon><FontAwesomeIcon icon={faLock} /></Icon>
                <BaseInput
                  id="password"
                  type={showPwd ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={onChange}
                  autoComplete="current-password"
                />
                <Toggle
                  type="button"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                  onClick={() => setShowPwd((v) => !v)}
                >
                  <FontAwesomeIcon icon={showPwd ? faEyeSlash : faEye} />
                </Toggle>
              </InputWrap>

              <RowBetween>
                <label htmlFor="remember">
                  <input
                    id="remember"
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={onChange}
                  />
                  Remember me
                </label>
              </RowBetween>

              {error && <ErrorText>{error}</ErrorText>}

              <PrimaryButton type="submit">Sign In</PrimaryButton>
            </form>

            <FormDesc style={{ textAlign: "center", marginTop: 12 }}>
              New here?{" "}
              <Link
                to="/signup"
                style={{ fontWeight: 700, textDecoration: "underline", color: "#111827" }}
              >
                Create an account
              </Link>
            </FormDesc>
          </Card>
        </FormWrap>
      </Section>
    </>
  );
}
