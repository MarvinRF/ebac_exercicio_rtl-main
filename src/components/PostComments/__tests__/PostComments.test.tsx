import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import Post from "../../Post";
import PostComment from "../index";

describe("Teste para o componente PostComent", () => {
  it("Deve renderizar o componente sem crashar", () => {
    render(<PostComment />);
    expect(screen.getByText("Comentar")).toBeInTheDocument();
  });

  it("deve permitir que o usuario comente", () => {
    render(<Post children={undefined} imageUrl={""} />);

    const textarea = screen.getByTestId("comment-form-textarea");
    const button = screen.getByTestId("comment-button");

    fireEvent.change(textarea, {
      target: { value: "Eu Cabo Daciollo gostei" },
    });

    expect(textarea).toHaveValue("Eu Cabo Daciollo gostei");

    fireEvent.click(button);

    const commentItems = screen.getAllByTestId("post-comment");

    expect(commentItems).toHaveLength(1);
    expect(commentItems[0]).toHaveTextContent("Eu Cabo Daciollo gostei");
  });
  it("Deve testar se existem dois comentários", () => {
    render(<Post children={undefined} imageUrl={""} />);

    const textarea = screen.getByTestId("comment-form-textarea");
    const button = screen.getByTestId("comment-button");

    fireEvent.change(textarea, { target: { value: "Primeiro comentario" } });
    fireEvent.click(button);

    fireEvent.change(textarea, { target: { value: "Segundo Comentário" } });
    fireEvent.click(button);

    const commentItems = screen.getAllByTestId("post-comment");
    expect(commentItems).toHaveLength(2);
    expect(commentItems[0]).toHaveTextContent("Primeiro comentario");
    expect(commentItems[1]).toHaveTextContent("Segundo Comentário");
  });

  it("Deve limpar a text area após o comentário ser enviado", () => {
    render(<Post children={undefined} imageUrl={""} />);

    const textarea = screen.getByTestId("comment-form-textarea");
    const button = screen.getByTestId("comment-button");

    fireEvent.change(textarea, {
      target: { value: "Eu Padre Kelmon abençoo esta miniatura" },
    });
    expect(textarea).toHaveValue("Eu Padre Kelmon abençoo esta miniatura");

    fireEvent.click(button);
    expect(textarea).toHaveValue("");
  });
});
