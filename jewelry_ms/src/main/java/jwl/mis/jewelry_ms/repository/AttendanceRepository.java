package jwl.mis.jewelry_ms.repository;

import jwl.mis.jewelry_ms.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance,Long> {

    List<Attendance> findByEmpIdAndDateBetween(String empId, LocalDate start, LocalDate end);
}
