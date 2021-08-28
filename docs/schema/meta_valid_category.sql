CREATE TABLE meta_valid_category (
  event VARCHAR(255) PRIMARY KEY
);

INSERT INTO meta_valid_category (event) VALUES 
  ('http'),
  ('runtime'),
  ('vue_runtime'),
  ('error_boundary_invocation'),
  ('logging'),
  ('analytics');
