CREATE PROCEDURE PDFData()
BEGIN
    DECLARE totalComplaints INT;
    DECLARE unfinishedComplaints INT;
    DECLARE finishedComplaints INT;
    DECLARE frequentComplaintTypeDescription VARCHAR(255);
    DECLARE frequentComplaintTypeCount INT;

    SELECT COUNT(*) INTO totalComplaints FROM complaint;

    SELECT COUNT(*) INTO unfinishedComplaints FROM complaint WHERE idComplaintStatus <> 4;

    SELECT COUNT(*) INTO finishedComplaints FROM complaint WHERE idComplaintStatus = 4;

    SELECT ct.description, COUNT(*) INTO frequentComplaintTypeDescription, frequentComplaintTypeCount
    FROM complaint AS c
    INNER JOIN complaint_type AS ct ON ct.id = c.idComplaintType
    GROUP BY c.idComplaintType
    ORDER BY COUNT(*) DESC
    LIMIT 1;

    SELECT
        totalComplaints,
        unfinishedComplaints,
        finishedComplaints,
        frequentComplaintTypeDescription,
        frequentComplaintTypeCount;
END;
