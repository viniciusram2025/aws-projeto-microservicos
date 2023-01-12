package br.com.cursoudemy.productapi.config.exception;

import lombok.Data;

@Data
public class ValidationException extends RuntimeException {
  public ValidationException(String message) {
    super(message);
  }
}
