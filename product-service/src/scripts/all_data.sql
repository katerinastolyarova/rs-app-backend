INSERT INTO products (id, title, description, price) VALUES 
    ('857aaf9e-dd73-4292-86c3-e155db022761', 'JavaScript for impatient programmers', 'This book makes JavaScript less challenging to learn for newcomers, by offering a modern view that is as consistent as possible.', 24),
    ('2235d4df-9e2f-4aa5-ad94-1cd3191798fd', 'Learning Perl: Making Easy Things Easy and Hard Things Possible', 'If you’re just getting started with Perl, this is the book you want—whether you’re a programmer, system administrator, or web hacker. Nicknamed "the Llama" by two generations of users, this bestseller closely follows the popular introductory Perl course taught by the authors since 1991.', 19),
    ('65c020b4-2cf0-4301-ab0f-0400862b94c7', '​Deep Learning with JavaScript', 'This book should serve as the authoritative source for readers who want to learn ML and use JavaScript as their main language.', 21.5),
    ('d6c5b8e5-34b0-4791-b936-0bed8a71e4b7', '​UI Design for iOS App Development: Using SwiftUI', 'Design is a challenge for most developers. Without a background or training in user interface skills, it’s hard to navigate what choices make the best sense for the end user.', 18.7),
    ('f46cd1f7-489a-431b-a08c-b25aacde4ad2', '​React to Python: Creating React Front-End Web Applications with Python', 'Learn to create responsive front-end web applications in Python using the React and Material-UI JavaScript libraries without having to program in JavaScript!', 20.8),
    ('56adb89e-a6d6-4547-a57d-ba0726b68c0d', '​The Python 3 Standard Library by Example', 'The Python 3 Standard Library contains hundreds of modules for interacting with the operating system, interpreter, and Internet―all extensively tested and ready to jump-start application development.', 19);


INSERT INTO stocks (product_id, count) VALUES 
    ('857aaf9e-dd73-4292-86c3-e155db022761', 11),
    ('2235d4df-9e2f-4aa5-ad94-1cd3191798fd', 1),   
    ('65c020b4-2cf0-4301-ab0f-0400862b94c7', 4),
    ('d6c5b8e5-34b0-4791-b936-0bed8a71e4b7', 7),
    ('f46cd1f7-489a-431b-a08c-b25aacde4ad2', 10),
    ('56adb89e-a6d6-4547-a57d-ba0726b68c0d', 2);