CREATE PROCEDURE PDFData()
BEGIN
    DECLARE totalComplaints INT;
    DECLARE unfinishedComplaints INT;
    DECLARE finishedComplaints INT;
    DECLARE frequentComplaintTypeDescription VARCHAR(255);
    DECLARE frequentComplaintTypeCount INT;

    SELECT COUNT(*) INTO totalComplaints FROM complaints;
    SELECT COUNT(*) INTO unfinishedComplaints FROM complaints WHERE complaints.complaintStatusId <> 4;
    SELECT COUNT(*) INTO finishedComplaints FROM complaints WHERE complaints.complaintStatusId = 4;

    SELECT ct.description, COUNT(*) INTO frequentComplaintTypeDescription, frequentComplaintTypeCount
    FROM complaints AS c
    INNER JOIN complaint_types AS ct ON ct.complaintTypeId = c.complaintTypeId
    GROUP BY c.complaintTypeId
    ORDER BY frequentComplaintTypeCount DESC
    LIMIT 1;

    SELECT
        totalComplaints,
        unfinishedComplaints,
        finishedComplaints,
        frequentComplaintTypeDescription,
        frequentComplaintTypeCount;
END
