import "./Modal.css";

type ModalProps = {
    open: boolean;
    title?: string;
    onClose: () => void;
    children: React.ReactNode;
};

export default function Modal({
    open,
    title,
    onClose,
    children,
}: ModalProps) {
    if (!open) return null;
    console.log("Modal render", open);

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
        >
            <div
                className="modal"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >
                <div className="modal-header">
                    {title && <h2>{title}</h2>}

                    <button
                        className="modal-close"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
}