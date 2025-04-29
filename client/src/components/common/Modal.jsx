import React from "react";

const Modal = ({
  title,
  description,
  confirmText,
  cancelText,
  onCancel,
  onConfirm,
  isLoading,
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{description}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg cursor-pointer 
            hover:scale-105 transition-all duration-300"
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-gradient-to-b from-[var(--color-special)] to-[var(--color-accent)] 
            text-white rounded-lg cursor-pointer hover:scale-105 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
