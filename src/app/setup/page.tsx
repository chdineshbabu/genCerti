"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { auth } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import  {Deploy}  from "../api/contract/deploy";

interface Organization {
  name: string;
  address: string;
  contractAddress: string;
  email: string | null;
}

export default function CreateOrganization() {
  const [user] = useAuthState(auth);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [organization, setOrganization] = useState<Organization | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("User not authenticated.");
      return;
    }

    setIsLoading(true);
    setStatus("Deploying contract...");

    try {
      const contract = await Deploy();
      const contractAddress = contract?.contractAddress;
      if (!contractAddress) {
        throw new Error("Failed to retrieve contract address.");
      }
      setStatus("Saving organization...");
      const response = await axios.post("/api/orginization", {
        orgName: name,
        orgEmail: user.email,
        address,
        orgId: user.uid,
        isContract: true,
        contractAddress,
      });

      if (response) {
        setOrganization({ name, address, contractAddress, email: user.email });
      } else {
        throw new Error("Failed to save organization.");
      }
    } catch (error) {
      console.error("Organization creation error details:", error);
      if (error instanceof Error) {
        alert(`Failed to create organization: ${error.message}`);
      } else {
        alert("An unexpected error occurred while creating the organization. Please check the console for details.");
      }
    } finally {
      setIsLoading(false);
      setStatus("");
    }
  };

  const checkOrganizationExists = useCallback(async () => {
    if (user) {
      try {
        const response = await axios.get(`/api/orginization?orgId=${user.uid}`);
        if (response.data.isContract) {
          router.push("/dash");
        }
      } catch (error) {
        console.error("Error checking organization:", error);
      }
    }
  }, [user, router]);

  useEffect(() => {
    checkOrganizationExists();
  }, [checkOrganizationExists]);

  const handleContinue = () => {
    router.push("/dash");
  };

  if (organization) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl font-thin mb-6">Welcome,<span className="text-customGreen"> {user?.displayName}</span></h1>
        <div className="max-w-lg p-8 border rounded-lg shadow">
          <div className="mb-4">
            <h2 className="text-xl font-light">Organization Created</h2>
          </div>
          <div className="mb-4 space-y-2">
            <p className="font-thin">
              <strong>Name:</strong> {organization.name}
            </p>
            <p className="font-thin">
              <strong>Address:</strong> {organization.address}
            </p>
            <p className="font-thin">
              <strong>Contract Address:</strong> {organization.contractAddress}
            </p>
          </div>
          <button
            onClick={handleContinue}
            className="w-full px-4 py-2 border text-white hover:text-black rounded-md hover:bg-customGreen"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-thin mb-6">Welcome,<span className="text-customGreen"> {user?.displayName}</span></h1>
      <div className="max-w-md p-12 border rounded-lg shadow">
        <div className="mb-4">
          <h2 className="text-2xl font-light">Create Organization</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-thin">
              Organization Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              required
              className="w-full px-3 py-2 text-black border rounded-md focus:ring focus:ring-blue-300 disabled:opacity-70"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-thin">
              Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={isLoading}
              required
              className="w-full px-3 py-2 border text-black rounded-md focus:ring focus:ring-blue-300 disabled:opacity-70"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 border text-white hover:text-black rounded-md hover:bg-customGreen disabled:opacity-70"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{status}</span>
              </div>
            ) : (
              "Create Organization"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
