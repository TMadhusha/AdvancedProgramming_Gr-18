package jwl.mis.jewelry_ms.controller;

import jwl.mis.jewelry_ms.Service.BidItemsService;
import jwl.mis.jewelry_ms.model.ApiResponse;
import jwl.mis.jewelry_ms.model.BidItems;
import jwl.mis.jewelry_ms.model.BidRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/biditems") // Base mapping for all bid items related endpoints
@CrossOrigin("http://localhost:3000")
public class BidItemsController {

    @Autowired
    private BidItemsService bidItemsService;

    @PostMapping("/{bid_id_item}/bid")
    public ResponseEntity<?> placeBid(@PathVariable Long bid_item_id, @RequestBody BidRequest bidRequest) {
        String message = bidItemsService.placeBid(bid_item_id, bidRequest);
        return ResponseEntity.ok(new ApiResponse(true, message));
    }

    @GetMapping("/{bid_item_id}")
    public ResponseEntity<BidItems> getItemDetails(@PathVariable Long bid_item_id) {
        BidItems biditems = bidItemsService.getItemById(bid_item_id);
        return ResponseEntity.ok(biditems);
    }
}
