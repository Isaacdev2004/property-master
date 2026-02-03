import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { useUpload } from "@/hooks/use-upload";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export function ImageUpload({ label, value, onChange, placeholder = "Enter image URL or upload" }: ImageUploadProps) {
  const [mode, setMode] = useState<"url" | "upload">(value ? "url" : "upload");
  const [preview, setPreview] = useState<string>(value || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { uploadFile, isUploading, progress } = useUpload({
    onSuccess: (response) => {
      const imageUrl = response.objectPath;
      onChange(imageUrl);
      setPreview(imageUrl);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);
      await uploadFile(file);
    }
  };

  const handleUrlChange = (url: string) => {
    onChange(url);
    setPreview(url);
  };

  const handleClear = () => {
    onChange("");
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      <div className="flex gap-2 mb-2">
        <Button
          type="button"
          variant={mode === "upload" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("upload")}
          className={mode === "upload" ? "bg-[#970A44] hover:bg-[#720632]" : ""}
        >
          <Upload className="w-4 h-4 mr-1" />
          Upload
        </Button>
        <Button
          type="button"
          variant={mode === "url" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("url")}
          className={mode === "url" ? "bg-[#970A44] hover:bg-[#720632]" : ""}
        >
          <LinkIcon className="w-4 h-4 mr-1" />
          URL
        </Button>
      </div>

      {mode === "upload" ? (
        <div className="space-y-2">
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#970A44] transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {isUploading ? (
              <div className="space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#970A44] mx-auto"></div>
                <p className="text-sm text-gray-500">Uploading... {progress}%</p>
              </div>
            ) : preview ? (
              <div className="relative">
                <img 
                  src={preview.startsWith("/objects/") ? preview : preview} 
                  alt="Preview" 
                  className="max-h-32 mx-auto rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f0f0f0' width='100' height='100'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 right-0 h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <ImageIcon className="w-8 h-8 mx-auto text-gray-400" />
                <p className="text-sm text-gray-500">Click to upload an image</p>
                <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            data-testid="input-file-upload"
          />
        </div>
      ) : (
        <div className="space-y-2">
          <Input
            type="url"
            value={value}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder={placeholder}
            data-testid="input-image-url"
          />
          {preview && (
            <div className="relative inline-block">
              <img 
                src={preview} 
                alt="Preview" 
                className="max-h-32 rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 h-6 w-6"
                onClick={handleClear}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
