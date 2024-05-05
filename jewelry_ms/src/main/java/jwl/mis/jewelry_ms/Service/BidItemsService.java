package jwl.mis.jewelry_ms.Service;

import jwl.mis.jewelry_ms.model.BidItems;
import jwl.mis.jewelry_ms.model.BidRequest;
import jwl.mis.jewelry_ms.repository.BidItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BidItemsService {
    @Autowired
    private BidItemsRepository bidItemsRepository;

    public BidItems getItemById(Long itemId) {
        return bidItemsRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));
    }

    public String placeBid(Long itemId, BidRequest bidRequest) {
        BidItems item = bidItemsRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        // Update bid details based on bid request
        if (bidRequest.isAutomatic()) {
            // Handle automatic bid
            // Logic to update maximum bid amount
        } else {
            // Handle single bid
            // Logic to update current bid amount
        }

        // Save the updated item to the database
        bidItemsRepository.save(item);

        return "Bid placed successfully.";
    }
}
